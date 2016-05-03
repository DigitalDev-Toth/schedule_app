defmodule ScheduleUsersChannelToken do
    use GenServer

    def start_link(opts \\ []) do
        {:ok, _pid} = GenServer.start_link(ScheduleUsersChannelToken, [
            {:ets_table_name, :schedule_users_channel_token_table},
            {:ets_table_limit, 1000}
        ], opts)
    end

    def init(args) do
        [{:ets_table_name, ets_table_name}, {:ets_table_limit, ets_table_limit}] = args

        :ets.new(ets_table_name, [:named_table, :set, :private])

        {:ok, %{ets_table_limit: ets_table_limit, ets_table_name: ets_table_name}}
    end

    def new_schedule_user_channel_token(key, userChannelToken) do
        GenServer.call(:schedule_users_channel_token, {key, userChannelToken})
    end

    def get_schedule_user_channel_token(key) do
        GenServer.call(:schedule_users_channel_token, {key})
    end

    def handle_call({key, userChannelToken}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = new_schedule_user_channel_token(key, userChannelToken, ets_table_name)
        {:reply, result, state}
    end

    def handle_call({key}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.lookup(ets_table_name, key)
        {:reply, result, state}
    end

    defp new_schedule_user_channel_token(key, userChannelToken, ets_table_name) do
        :ets.insert(ets_table_name, {key, [userChannelToken]})
    end
end
