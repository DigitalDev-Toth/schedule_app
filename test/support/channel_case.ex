defmodule ScheduleApp.ChannelCase do
    use ExUnit.CaseTemplate

    using do
        quote do
            use Phoenix.ChannelTest

            @endpoint ScheduleApp.Endpoint
        end
    end

    setup tags do
        :ok
    end
end
