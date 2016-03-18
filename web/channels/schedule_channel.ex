defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedules:app", _message, socket) do
        {:ok, socket}
    end

    def handle_in("new:schedule", params, socket) do
        broadcast! socket, "new:schedule", %{
            text: "New connection"
        }

        {:reply, :ok, socket}
    end

    def handle_out("new:schedule", payload, socket) do
        push socket, "new:schedule", payload
        {:noreply, socket}
    end
end
