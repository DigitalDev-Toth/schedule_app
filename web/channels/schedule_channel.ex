defmodule Schedule.ScheduleChannel do
    use Phoenix.Channel

    def join("schedule:lobby", params, socket) do
        send(self, {:after_join, params})

        {:ok, params, socket}
    end

    def handle_info({:after_join, params}, socket) do
        unless params["userRemote"]["ip"] === nil do
            ScheduleUsersRemote.new_schedule_user_remote("users_remote", %{
                ip: params["userRemote"]["ip"],
                method: params["userRemote"]["method"],
                agent: params["userRemote"]["agent"]
            })
        end

        broadcast! socket, "schedule:user_entered", %{user: params["user"]}
        push socket, "join", %{status: "connected"}

        {:noreply, socket}
    end

    def handle_in("schedule:onlooker", params, socket) do
        users_remote = ScheduleUsersRemote.get_schedule_users_remote("users_remote")
        |> parse_users_remote

        broadcast! socket, "schedule:onlooker", %{usersRemote: users_remote}

        {:reply, {:ok, %{usersRemote: users_remote}}, assign(socket, :schedule, params)}
    end

    # def terminate(_reason, _socket) do
    #     :ok
    # end

    def parse_users_remote([]), do: []
    def parse_users_remote([{_topic, users_remote}]), do: Enum.reverse(users_remote)
end
