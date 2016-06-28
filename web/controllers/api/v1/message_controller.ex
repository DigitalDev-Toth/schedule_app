defmodule ScheduleApp.MessageController do
    use ScheduleApp.Web, :controller

    plug Guardian.Plug.EnsureAuthenticated, handler: ScheduleApp.SessionController

    ##
    ## @brief      Welcome endpoint
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def welcome(conn, params) do
        id = params["id"]
        name = params["name"]
        message = "Bienvenido #{name}"

        ScheduleApp.AppChannel.welcome(id, message)

        conn
        |> put_status(:created)
        |> render("show.json")
    end

    ##
    ## @brief      Entered endpoint
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def entered(conn, params) do
        id = params["id"]
        name = params["name"]
        message = "#{name} ha ingresado"

        ScheduleApp.AppChannel.entered(id, message)

        conn
        |> put_status(:created)
        |> render("show.json")
    end
end
