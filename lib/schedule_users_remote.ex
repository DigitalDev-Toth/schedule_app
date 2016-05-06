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

    def new_schedule_user_remote(key, userRemote) do
        GenServer.call(:schedule_users_remote, {key, userRemote})
    end

    def get_schedule_users_remote() do
        GenServer.call(:schedule_users_remote, {nil})
    end

    def remove_schedule_user_remote(key) do
        GenServer.call(:schedule_users_remote, {key, nil})
    end

    def handle_call({key, userRemote}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = new_schedule_user_remote(key, userRemote, ets_table_name)
        {:reply, result, state}
    end

    def handle_call({_key}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.match_object(ets_table_name, :"$1")
        {:reply, result, state}
    end

    def handle_call({key, _rm}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.delete(ets_table_name, key)
        {:reply, result, state}
    end

    defp new_schedule_user_remote(key, userRemote, ets_table_name) do
        case :ets.member(ets_table_name, key) do
            false ->
                # true = :ets.insert(ets_table_name, {key, [userRemote]})
                :ets.insert_new(ets_table_name, {key, [userRemote]})
                {:ok, userRemote}
            true ->
                # [{_topic, usersRemote}]= :ets.lookup(ets_table_name, topic)
                # :ets.insert(ets_table_name, {topic, [userRemote | usersRemote]})
                {:ok, userRemote}
        end
    end
end
