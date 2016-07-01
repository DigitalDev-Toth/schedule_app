defmodule ScheduleApp.AppChannel do
    use Phoenix.Channel

    ##
    ## @brief      Join to topic/module schedule
    ##
    ## @param      payload  The payload
    ## @param      socket    The socket
    ##
    ## @return     The status
    ##
    def join("module:schedule", payload, socket) do
        socket = assign(socket, :key, payload["key"])

        {:ok, socket}
    end

    ##
    ## @brief      Join to topic/module looker
    ##
    ## @param      _payload  The payload
    ## @param      socket    The socket
    ##
    ## @return     The status
    ##
    def join("module:looker", _payload, socket) do
        {:ok, socket}
    end

    ##
    ## @brief      Welcome message
    ##
    ## @param      id       The identifier
    ## @param      message  The message
    ##
    def welcome(id, message) do
        ScheduleApp.Endpoint.broadcast!(
            "module:schedule",
            "welcome__#{id}",
            %{id: id, message: message})
    end

    ##
    ## @brief      Entered message
    ##
    ## @param      id       The identifier
    ## @param      message  The message
    ##
    def entered(id, message) do
        ScheduleApp.Endpoint.broadcast!(
            "module:schedule",
            "entered",
            %{id: id, message: message})
    end

    ##
    ## @brief      Remote users
    ##
    ## @param      users  The users
    ##
    def remote_users(users) do
        ScheduleApp.Endpoint.broadcast!(
            "module:looker",
            "remote_users",
            %{users: users})
    end

    ##
    ## @brief      Terminate
    ##
    ## @param      _reason  The reason
    ## @param      socket   The socket
    ##
    def terminate(_reason, socket) do
        topic = socket.topic

        if topic == "module:schedule" do
            key = socket.assigns.key

            {:ok, users} = ScheduleApp.Looker.delete_user(key)

            ScheduleApp.AppChannel.remote_users(users)
        end

        :ok
    end
end
