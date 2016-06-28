defmodule ScheduleApp.AppChannel do
    use Phoenix.Channel

    ##
    ## @brief      Join to topic/module schedule
    ##
    ## @param      _payload  The payload
    ## @param      socket    The socket
    ##
    ## @return     The status
    ##
    def join("module:schedule", _payload, socket) do
        # send(self, {:after_join, payload})

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
end
