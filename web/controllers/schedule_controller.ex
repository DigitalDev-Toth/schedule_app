defmodule Schedule.ScheduleController do
    use Schedule.Web, :controller

    def index(conn, _params) do
        render conn, :index
    end

    def onlooker(conn, params) do
        IO.inspect conn

        remote_ip = Enum.join(Tuple.to_list(conn.remote_ip), ".")

        conn
        |> assign(:remote_ip, remote_ip)
        |> put_layout("looker.html")
        |> render(:onlooker)
    end
end
