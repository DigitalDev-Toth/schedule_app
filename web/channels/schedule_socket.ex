defmodule Schedule.ScheduleSocket do
    use Phoenix.Socket

    channel "schedule:*", Schedule.ScheduleChannel

    ## Transports
    transport :websocket, Phoenix.Transports.WebSocket
    transport :longpoll, Phoenix.Transports.LongPoll

    def connect(%{"schedule" => schedule, "token" => token}, socket) do
        if (schedule == 1 or schedule == "1") do
            {:ok, assign(socket, :channel_token, token)}
        else
            content_token = JsonWebToken.verify(token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})
            remote_ip = Enum.at(Tuple.to_list(content_token), 1)[:remote_ip]

            channel_token = ScheduleUsersChannelToken.get_schedule_user_channel_token(remote_ip)
            |> parse_user_channel_token

            if authorized_lobby?(channel_token, token) do
                {:ok, assign(socket, :channel_token, channel_token)}
            else
                :error
            end
        end
    end
    def connect(_params, _socket), do: :error

    def id(socket), do: "schedule_socket:#{socket.assigns.channel_token}"

    defp parse_user_channel_token([]), do: []
    defp parse_user_channel_token([{_topic, list}]) do
        Enum.at(list, 0)[:channel_token]
    end

    defp authorized_lobby?(channel_token, token) do
        channel_token_time = 0
        token_time = 1

        unless (channel_token == nil or token == nil) do
            channel_token_time = Enum.at(Tuple.to_list(JsonWebToken.verify(channel_token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})), 1)[:time]
            token_time = Enum.at(Tuple.to_list(JsonWebToken.verify(token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})), 1)[:time]
        end

        if (channel_token_time == token_time) do
            true
        else
            false
        end
    end
end
