defmodule Schedule.ScheduleController do
    use Schedule.Web, :controller
    use Timex

    def index(conn, params) do
        # user_auth = JsonWebToken.verify(params["token"], %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})

        user_token = params["token"]

        remote_method = conn.method
        remote_ip = Enum.join(Tuple.to_list(conn.remote_ip), ".")
        remote_user_agent = Enum.at(Tuple.to_list(List.keyfind(conn.req_headers, "user-agent", 0)), 1)

        current_time = Enum.at(Tuple.to_list(Timex.format(DateTime.now, "%s", :strftime)), 1)
        channel_token = JsonWebToken.sign(%{
            time: current_time,
            remote_ip: remote_ip,
            remote_method: remote_method,
            remote_user_agent: remote_user_agent}, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})

        schedule_token = JsonWebToken.sign(%{controller: "index"}, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})

        ScheduleUsersChannelToken.new_schedule_user_channel_token(remote_ip, %{
            ip: remote_ip,
            channel_token: channel_token
        })

        conn
        |> assign(:schedule_token, schedule_token)
        |> assign(:user_token, user_token)
        |> assign(:channel_token, channel_token)
        |> render(:index)
    end

    def onlooker(conn, params) do
        user_token = params["token"]

        current_time = Enum.at(Tuple.to_list(Timex.format(DateTime.now, "%s", :strftime)), 1)
        channel_token = JsonWebToken.sign(%{time: current_time}, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})

        conn
        |> assign(:user_token, user_token)
        |> assign(:channel_token, channel_token)
        |> put_layout("onlooker.html")
        |> render(:onlooker)
    end

    def api(conn, _params) do
        conn
        |> put_layout("api.html")
        |> render(:api)
    end
end
