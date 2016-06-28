defmodule ScheduleApp.GuardianSerializer do
    @behaviour Guardian.Serializer

    def for_token(id), do: {:ok, id}
    def for_token(_), do: {:error, "Unknown resource type"}

    def from_token(id), do: {:ok, id}
    def from_token(_), do: {:error, "Unknown resource type"}
end
