defmodule ScheduleApp.Endpoint do
    use Phoenix.Endpoint, otp_app: :schedule_app

    socket "/socket", ScheduleApp.AppSocket

    plug Plug.Static,
        at: "/", from: :schedule_app, gzip: false,
        only: ~w(css fonts images js favicon.ico robots.txt)

    if code_reloading? do
        socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
        plug Phoenix.LiveReloader
        plug Phoenix.CodeReloader
    end

    plug Plug.RequestId
    plug Plug.Logger

    plug Plug.Parsers,
        parsers: [:urlencoded, :multipart, :json],
        pass: ["*/*"],
        json_decoder: Poison

    plug Plug.MethodOverride
    plug Plug.Head

    plug Plug.Session,
        store: :cookie,
        key: "_schedule_app_key",
        signing_salt: "YPX8NUsz"

    plug ScheduleApp.Router
end
