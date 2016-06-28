use Mix.Config

config :schedule_app, ScheduleApp.Endpoint,
    http: [port: 4000],
    debug_errors: true,
    code_reloader: true,
    check_origin: false,
    watchers: [node: ["node_modules/webpack/bin/webpack.js", "--watch-stdin", "--progress", "--colors"]]

config :schedule_app, ScheduleApp.Endpoint,
    live_reload: [
        patterns: [
            ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
            ~r{priv/gettext/.*(po)$},
            ~r{web/views/.*(ex)$},
            ~r{web/templates/.*(eex)$}
        ]
    ]

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20
