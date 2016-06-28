defmodule ScheduleApp.Web do
    def model do
        quote do

        end
    end

    def controller do
        quote do
            use Phoenix.Controller

            import ScheduleApp.Router.Helpers
            import ScheduleApp.Gettext
        end
    end

    def view do
        quote do
            use Phoenix.View, root: "web/templates"

            import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

            use Phoenix.HTML

            import ScheduleApp.Router.Helpers
            import ScheduleApp.ErrorHelpers
            import ScheduleApp.Gettext
        end
    end

    def router do
        quote do
            use Phoenix.Router
        end
    end

    def channel do
        quote do
            use Phoenix.Channel
            import ScheduleApp.Gettext
        end
    end

    defmacro __using__(which) when is_atom(which) do
        apply(__MODULE__, which, [])
    end
end
