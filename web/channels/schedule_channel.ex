defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    @usersRemote []

    def join("schedule:lobby", params, socket) do
        send(self, {:after_join, params})

        {:ok, params, socket}
    end

    # def join("schedule:" <> _private_subtopic, _params, _socket) do
    #     {:error, %{reason: "unauthorized"}}
    # end

    def handle_info({:after_join, params}, socket) do
        @usersRemote = Enum.into(@usersRemote, params["userRemote"])

        broadcast! socket, "schedule:user_entered", %{user: params["user"], userRemote: @usersRemote}
        push socket, "join", %{status: "connected"}

        {:noreply, socket}
    end

    def handle_in("schedule:onlooker", params, socket) do
        broadcast! socket, "schedule:onlooker", %{usersRemote: @usersRemote}

        {:reply, {:ok, %{usersRemote: @usersRemote}}, assign(socket, :schedule, params)}
    end

    # def terminate(_reason, _socket) do
    #     :ok
    # end
end
