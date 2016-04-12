defmodule ScheduleUsersRemote do
    use GenServer

    def start_link(opts \\ []) do
        {:ok, _pid} = GenServer.start_link(ScheduleUsersRemote, [
            {:ets_table_name, :schedule_users_remote_table},
            {:ets_table_limit, 1000}
        ], opts)
    end

    def init(args) do
        [{:ets_table_name, ets_table_name}, {:ets_table_limit, ets_table_limit}] = args

        :ets.new(ets_table_name, [:named_table, :set, :private])

        {:ok, %{ets_table_limit: ets_table_limit, ets_table_name: ets_table_name}}
    end

    def new_schedule_user_remote(topic, userRemote) do
        GenServer.call(:schedule_users_remote, {topic, userRemote})
    end

    def get_schedule_users_remote(topic) do
        GenServer.call(:schedule_users_remote, {topic})
    end

    def handle_call({topic, userRemote}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = new_schedule_user_remote(topic, userRemote, ets_table_name)
        {:reply, result, state}
    end

    def handle_call({topic}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.lookup(ets_table_name, topic)
        # result = :ets.match_object(ets_table_name, :"$1")
        IO.inspect result
        {:reply, result, state}
    end

    defp new_schedule_user_remote(topic, userRemote, ets_table_name) do
        check_exist(topic, userRemote, ets_table_name)

        case :ets.member(ets_table_name, topic) do
            false ->
                true = :ets.insert(ets_table_name, {topic, [userRemote]})
                {:ok, userRemote}
            true ->
                [{_topic, usersRemote}]= :ets.lookup(ets_table_name, topic)
                :ets.insert(ets_table_name, {topic, [userRemote | usersRemote]})
                {:ok, userRemote}
        end
    end

    def check_exist(topic, userRemote, ets_table_name) do
        check = false

        result = :ets.match(ets_table_name, {:"$1", ["$2", "192.168.1.103", :"_"]})

        IO.puts "========================================"
        IO.inspect result
        IO.puts "========================================"
    end
end
