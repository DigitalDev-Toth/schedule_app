defmodule ScheduleApp.Looker do

    ##
    ## @brief      Set user.
    ##
    ## @param      conn    The connection
    ## @param      params  The parameters
    ##
    def set_user(conn, params) do
        id = params["id"]
        username = params["username"]
        name = params["name"]
        ip = Enum.join(Tuple.to_list(conn.remote_ip), ".")
        agent = Enum.at(Tuple.to_list(List.keyfind(conn.req_headers, "user-agent", 0)), 1)

        ScheduleApp.RemoteUsers.new_user(id, %{
            id: id,
            username: username,
            name: name,
            ip: ip,
            agent: agent
        })
        users = ScheduleApp.RemoteUsers.get_users()
        |> parse_users

        {:ok, users}
    end

    ##
    ## @brief      Gets the users.
    ##
    ## @return     The users.
    ##
    def get_users() do
        users = ScheduleApp.RemoteUsers.get_users()
        |> parse_users

        {:ok, users}
    end

    ##
    ## @brief      Delete an user.
    ##
    ## @param      key   The key
    ##
    def delete_user(key) do
        ScheduleApp.RemoteUsers.delete_user(key)

        users = ScheduleApp.RemoteUsers.get_users()
        |> parse_users


        {:ok, users}
    end

    ##
    ## @brief      Parse users.
    ##
    ## @param      users  The users
    ##
    ## @return     The users.
    ##
    defp parse_users(users) do
        data = for user <- users do
            Enum.at(Enum.at(Tuple.to_list(user), 1), 0)
        end

        data
    end
end
