use Mix.Config

config :schedule_app, ScheduleApp.Endpoint,
  http: [port: 4001],
  server: false

config :logger, level: :warn
