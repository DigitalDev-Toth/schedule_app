defmodule Schedule.ScheduleController do
    use Schedule.Web, :controller

    def index(conn, _params) do
        remote_method = conn.method
        remote_ip = Enum.join(Tuple.to_list(conn.remote_ip), ".")
        remote_user_agent = Enum.at(Tuple.to_list(List.keyfind(conn.req_headers, "user-agent", 0)), 1)

        conn
        |> assign(:remote_method, remote_method)
        |> assign(:remote_ip, remote_ip)
        |> assign(:remote_user_agent, remote_user_agent)
        |> render(:index)
    end

    def onlooker(conn, _params) do
        conn
        |> put_layout("onlooker.html")
        |> render(:onlooker)
    end

    def api(conn, _params) do
        conn
        |> put_layout("api.html")
        |> render(:api)
    end
end
