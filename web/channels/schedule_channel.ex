defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedule:lobby", payload, socket) do
        send(self, {:after_join, payload})

        {:ok, payload, socket}
    end

    # def join("schedule:" <> _private_room_id, _payload, _socket) do
    #     {:error, %{reason: "unauthorized"}}
    # end

    def handle_info({:after_join, payload}, socket) do
        username = payload["user"]
        schedule_token = payload["scheduleToken"]
        channel_token = payload["channelToken"]

        content_channel_token = JsonWebToken.verify(channel_token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})
        remote_ip = Enum.at(Tuple.to_list(content_channel_token), 1)[:remote_ip]
        remote_method = Enum.at(Tuple.to_list(content_channel_token), 1)[:remote_method]
        remote_user_agent = Enum.at(Tuple.to_list(content_channel_token), 1)[:remote_user_agent]

        if schedule_token !== nil do
            ScheduleUsersRemote.new_schedule_user_remote(remote_ip, %{
                ip: remote_ip,
                method: remote_method,
                agent: remote_user_agent
            })

            broadcast! socket, "schedule:user_entered", %{user: payload["user"]}
            push socket, "join", %{status: "connected"}
        else
            users_remote = ScheduleUsersRemote.get_schedule_users_remote()
            |> parse_users_remote

            broadcast! socket, "schedule:onlooker", %{usersRemote: users_remote}
            push socket, "join", %{status: "connected"}
        end

        {:noreply, socket}
    end

    def handle_in("schedule:onlooker", payload, socket) do
        users_remote = ScheduleUsersRemote.get_schedule_users_remote()
        |> parse_users_remote

        broadcast! socket, "schedule:onlooker", %{usersRemote: users_remote}

        {:reply, {:ok, %{usersRemote: users_remote}}, assign(socket, :schedule, payload)}
    end

    # def terminate(_reason, socket) do
    #     IO.puts "======================================="
    #     IO.inspect socket
    #     IO.puts "======================================="
    #     :ok
    # end

    defp parse_users_remote(users_remote) do
        users = []

        users = for u <- users_remote do
            Enum.at(Enum.at(Tuple.to_list(u), 1), 0)
        end

        users
    end
end
