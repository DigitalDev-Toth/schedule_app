defmodule ScheduleApp do
    use Application

    def start(_type, _args) do
        import Supervisor.Spec, warn: false

        children = [
            supervisor(ScheduleApp.Endpoint, [])
        ]

        opts = [strategy: :one_for_one, name: ScheduleApp.Supervisor]
        Supervisor.start_link(children, opts)
    end

    def config_change(changed, _new, removed) do
        ScheduleApp.Endpoint.config_change(changed, removed)
        :ok
    end
end
