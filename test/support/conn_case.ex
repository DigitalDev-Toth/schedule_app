defmodule ScheduleApp.ConnCase do
    use ExUnit.CaseTemplate

    using do
        quote do
            use Phoenix.ConnTest

            import ScheduleApp.Router.Helpers

            @endpoint ScheduleApp.Endpoint
        end
    end

    setup tags do
        {:ok, conn: Phoenix.ConnTest.conn()}
    end
end
