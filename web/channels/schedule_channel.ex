defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedule:lobby", message, socket) do
        send(self, {:after_join, message})

        {:ok, message, socket}
    end

    def join("schedule:" <> _private_subtopic, _message, _socket) do
        {:error, %{reason: "unauthorized"}}
    end

    def handle_info({:after_join, msg}, socket) do
        broadcast! socket, "user:entered", %{user: msg["user"]}
        push socket, "join", %{status: "connected"}

        {:noreply, socket}
    end

    def handle_info(:ping, socket) do
        push socket, "new:msg", %{user: "SYSTEM", body: "ping"}

        {:noreply, socket}
    end

    def terminate(_rearon, _socket) do
        :ok
    end

    def handle_in("new:msg", msg, socket) do
        broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]}

        {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, msg["user"])}
    end

    # def handle_in("new:schedule", params, socket) do
    #     broadcast! socket, "new:schedule", %{
    #         text: "New connection"
    #     }

    #     {:reply, :ok, socket}
    # end

    # def handle_out("new:schedule", payload, socket) do
    #     push socket, "new:schedule", payload
    #     {:noreply, socket}
    # end
end
