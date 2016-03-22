defmodule Schedule.ScheduleController do
    use Schedule.Web, :controller

    def index(conn, _params) do
        render conn, :index
    end

    def onlooker(conn, _params) do
        # render conn, :onlooker
        conn
        |> put_layout("utilities.html")
        |> render(:onlooker)
    end
end
