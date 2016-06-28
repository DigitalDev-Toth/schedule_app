defmodule ScheduleApp.AppControllerTest do
    use ScheduleApp.ConnCase

    test "GET /", %{conn: conn} do
        conn = get conn, "/"
        assert html_response(conn, 200) =~ "Toth Schedule App"
    end
end
