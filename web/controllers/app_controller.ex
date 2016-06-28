defmodule ScheduleApp.AppController do
    use ScheduleApp.Web, :controller

    ##
    ## @brief      Schedule action
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def schedule(conn, params) do
        module = "schedule"
        token = params["token"]
        user_id = "error"

        if token != nil do
            user_id = case JsonWebToken.verify(token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"}) do
                {:ok, %{username: username}} ->
                    username
                {:error, message} ->
                    message
            end
        end

        conn
        |> assign(:module, module)
        |> assign(:token, token)
        |> assign(:username, user_id)
        |> render(:app)
    end

    ##
    ## @brief      Looker action
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def looker(conn, _params) do
        module = "looker"

        conn
        |> assign(:module, module)
        |> render(:app)
    end

    ##
    ## @brief      Error action
    ##
    ## @param      conn     The connection
    ## @param      _params  The parameters
    ##
    def error(conn, _params) do
        module = "error"
        token = "error"
        user_id = "error"

        conn
        |> assign(:module, module)
        |> assign(:token, token)
        |> assign(:username, user_id)
        |> render(:app)
    end
end
