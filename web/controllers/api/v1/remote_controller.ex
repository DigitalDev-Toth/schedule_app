defmodule ScheduleApp.RemoteController do
    use ScheduleApp.Web, :controller

    plug Guardian.Plug.EnsureAuthenticated, handler: ScheduleApp.SessionController

    ##
    ## @brief      Gets the users.
    ##
    ## @param      conn     The connection
    ## @param      _params  The parameters
    ##
    ## @return     The users.
    ##
    def get_users(conn, _params) do
        {:ok, users} = ScheduleApp.Looker.get_users()

        conn
        |> put_status(:created)
        |> render("show.json", users: users)
    end

    ##
    ## @brief      Sets the user.
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def set_user(conn, params) do
        {:ok, users} = ScheduleApp.Looker.set_user(conn, params)

        ScheduleApp.AppChannel.remote_users(users)

        conn
        |> put_status(:created)
        |> render("ok.json")
    end
end
