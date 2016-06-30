defmodule ScheduleApp.RemoteUsers do
    use GenServer

    ##
    ## @brief      Starts a link.
    ##
    ## @param      opts  The options
    ##
    def start_link(opts \\ []) do
        {:ok, _pid} = GenServer.start_link(ScheduleApp.RemoteUsers, [
            {:ets_table_name, :remote_users_table},
            {:ets_table_limit, 1000}
        ], opts)
    end

    ##
    ## @brief      Init.
    ##
    ## @param      args  The arguments
    ##
    def init(args) do
        [{:ets_table_name, ets_table_name}, {:ets_table_limit, ets_table_limit}] = args

        :ets.new(ets_table_name, [:named_table, :set, :private])

        {:ok, %{ets_table_limit: ets_table_limit, ets_table_name: ets_table_name}}
    end

    ##
    ## @brief      Gets the users.
    ##
    def get_users() do
        GenServer.call(:remote_users, {nil})
    end

    ##
    ## @brief      New user.
    ##
    ## @param      key   The key
    ## @param      user  The user
    ##
    def new_user(key, user) do
        GenServer.call(:remote_users, {key, user})
    end

    ##
    ## @brief      Delete an user.
    ##
    ## @param      key   The key
    ##
    def delete_user(key) do
        GenServer.call(:remote_users, {key, nil, nil})
    end

    ##
    ## @brief      Handle call
    ##
    ## @param      key    The key
    ## @param      user   The user
    ## @param      _from  The from
    ## @param      state  The state
    ##
    def handle_call({key, user}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = new_user(key, user, ets_table_name)
        {:reply, result, state}
    end

    ##
    ## @brief      Handle call
    ##
    ## @param      _key   The key
    ## @param      _from  The from
    ## @param      state  The state
    ##
    def handle_call({_}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.match_object(ets_table_name, :"$1")
        {:reply, result, state}
    end

    ##
    ## @brief      handle call
    ##
    ## @param      key    The key
    ## @param      _rm    The remove
    ## @param      _from  The from
    ## @param      state  The state
    ##
    def handle_call({key, _, _}, _from, state) do
        %{ets_table_name: ets_table_name} = state
        result = :ets.delete(ets_table_name, key)
        {:reply, result, state}
    end

    ##
    ## @brief      New user.
    ##
    ## @param      key             The key
    ## @param      user            The user
    ## @param      ets_table_name  The ets table name
    ##
    defp new_user(key, user, ets_table_name) do
        case :ets.member(ets_table_name, key) do
            false ->
                :ets.insert_new(ets_table_name, {key, [user]})
                {:ok, user}
            true ->
                {:ok, user}
        end
    end
end
