defmodule ScheduleApp.Router do
    use ScheduleApp.Web, :router

    pipeline :browser do
        plug :accepts, ["html"]
        plug :fetch_session
        plug :fetch_flash
        plug :protect_from_forgery
        plug :put_secure_browser_headers
    end

    pipeline :api do
        plug :accepts, ["json"]
        plug Guardian.Plug.VerifyHeader
        plug Guardian.Plug.LoadResource
    end

    scope "/", ScheduleApp do
        pipe_through :browser

        get     "/", AppController, :schedule
        get     "/schedule", AppController, :schedule
        get     "/schedule/:token", AppController, :schedule
        get     "/looker", AppController, :looker
        get     "/looker/:token", AppController, :looker
        get     "/error", AppController, :error
    end

    scope "/api", ScheduleApp do
        pipe_through :api

        scope "/v1" do
            post    "/auth/sessions", SessionController, :create
            delete  "/auth/sessions", SessionController, :delete
            post    "/message/welcome", MessageController, :welcome
            post    "/message/entered", MessageController, :entered
        end
    end
end
