defmodule ScheduleApp.SessionView do
    use ScheduleApp.Web, :view

    def render("show.json", %{token: token, user: user}) do
        %{
            token: token,
            user: Enum.at(String.split(user["_id"], "/"), 1),
            username: Enum.at(String.split(user["_id"], "/"), 1),
            name: user["name"]
        }
    end

    def render("admin.json", %{token: token, admin: admin, user: user}) do
        %{
            token: token,
            admin: admin,
            user: Enum.at(String.split(user["_id"], "/"), 1),
            username: Enum.at(String.split(user["_id"], "/"), 1),
            name: user["name"]
        }
    end

    def render("error.json", _) do
        %{error: "invalid token"}
    end

    def render("delete.json", _) do
        %{ok: true}
    end

    def render("forbidden.json", %{error: error}) do
        %{error: error}
    end
end
