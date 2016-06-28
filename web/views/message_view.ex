defmodule ScheduleApp.MessageView do
    use ScheduleApp.Web, :view

    def render("show.json", _) do
        %{ok: true}
    end

    def render("error.json", _) do
        %{error: "invalid token"}
    end
end
