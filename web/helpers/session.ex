defmodule ScheduleApp.Session do
    def authenticate(%{"token" => token, "user" => user}) do
        {:ok, %{username: username, password: password}} =
            JsonWebToken.verify(token, %{key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"})

        user_id = Enum.at(String.split(user["_id"], "/"), 1)

        if username == user_id do
            if Comeonin.Bcrypt.checkpw(password, user["password"]) do
                {:ok, user}
            else
                :error
            end
        else
            :error
        end
    end
end
