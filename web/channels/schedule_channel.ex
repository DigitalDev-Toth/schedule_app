defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedule:lobby", payload, socket) do
        send(self, {:after_join, payload})

        {:ok, payload, socket}
    end

    # def join("schedule:" <> _private_room_id, _payload, _socket) do
    #     {:error, %{reason: "unauthorized"}}
    # end

    def handle_info({:after_join, payload}, socket) do
        unless payload["userRemote"]["ip"] === nil do
            ScheduleUsersRemote.new_schedule_user_remote(payload["userRemote"]["ip"], %{
                ip: payload["userRemote"]["ip"],
                method: payload["userRemote"]["method"],
                agent: payload["userRemote"]["agent"]
            })
        end

        broadcast! socket, "schedule:user_entered", %{user: payload["user"]}
        push socket, "join", %{status: "connected"}

        {:noreply, socket}
    end

    def handle_in("schedule:onlooker", payload, socket) do
        users_remote = ScheduleUsersRemote.get_schedule_users_remote()
        |> parse_users_remote

        broadcast! socket, "schedule:onlooker", %{usersRemote: users_remote}

        {:reply, {:ok, %{usersRemote: users_remote}}, assign(socket, :schedule, payload)}
    end

    # def terminate(_reason, _socket) do
    #     :ok
    # end

    defp parse_users_remote(users_remote) do
        users = []

        users = for u <- users_remote do
            Enum.at(Enum.at(Tuple.to_list(u), 1), 0)
        end

        users
    end
end
