defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedule:lobby", params, socket) do
        send(self, {:after_join, params})

        {:ok, params, socket}
    end

    # def join("schedule:" <> _private_subtopic, _params, _socket) do
    #     {:error, %{reason: "unauthorized"}}
    # end

    def handle_info({:after_join, params}, socket) do
        broadcast! socket, "schedule:user_entered", %{user: params["user"]}
        push socket, "join", %{status: "connected"}

        {:noreply, socket}
    end

    def handle_in("schedule:message", params, socket) do
        broadcast! socket, "schedule:message", %{params: params}

        {:reply, {:ok, %{params: params}}, assign(socket, :schedule, params)}
    end

    # def terminate(_reason, _socket) do
    #     :ok
    # end
end
