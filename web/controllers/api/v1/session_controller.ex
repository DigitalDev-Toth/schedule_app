defmodule ScheduleApp.SessionController do
    use ScheduleApp.Web, :controller

    plug :scrub_params, "session" when action in [:create]

    ##
    ## @brief      Create session endpoint
    ##
    ## @param      conn     The connection
    ## @param      session  The session
    ##
    ## @return     The authorization
    ##
    def create(conn, %{"session" => session}) do
        case ScheduleApp.Session.authenticate(session) do
            {:ok, user} ->
                {:ok, token, _full_claims} = Guardian.encode_and_sign(user["_id"], :token)

                if user["role"] == 0 do
                    {:ok, admin, _full_claims} = Guardian.encode_and_sign(token, :token)

                    conn
                    |> put_status(:created)
                    |> render("admin.json", token: token, admin: admin, user: user)
                else
                    conn
                    |> put_status(:created)
                    |> render("show.json", token: token, user: user)
                end
            :error ->
                conn
                |> put_status(:unprocessable_entity)
                |> render("error.json")
        end
    end

    ##
    ## @brief      Delete session endpoint
    ##
    ## @param      conn  The connection
    ## @param      _     The params
    ##
    def delete(conn, _) do
        {:ok, claims} = Guardian.Plug.claims(conn)

        conn
        |> Guardian.Plug.current_token
        |> Guardian.revoke!(claims)

        conn
        |> render("delete.json")
    end

    def unauthenticated(conn, _params) do
        conn
        |> put_status(:forbidden)
        |> render(ScheduleApp.SessionView, "forbidden.json", error: "not authenticated")
    end
end
