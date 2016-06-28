defmodule ScheduleApp.Mixfile do
    use Mix.Project

    def project do
        [app: :schedule_app,
        version: "0.0.1",
        elixir: "~> 1.0",
        elixirc_paths: elixirc_paths(Mix.env),
        compilers: [:phoenix, :gettext] ++ Mix.compilers,
        build_embedded: Mix.env == :prod,
        start_permanent: Mix.env == :prod,
        deps: deps]
    end

    def application do
        [mod: {ScheduleApp, []},
        applications: [:phoenix, :phoenix_html, :cowboy, :logger, :gettext, :timex, :comeonin]]
    end

    defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
    defp elixirc_paths(_),     do: ["lib", "web"]

    defp deps do
        [{:phoenix,             "~> 1.1.4"},
        {:phoenix_html,         "~> 2.4"},
        {:phoenix_live_reload,  "~> 1.0", only: :dev},
        {:gettext,              "~> 0.9"},
        {:cowboy,               "~> 1.0"},
        {:guardian,             "~> 0.10.0"},
        {:comeonin,             "~> 2.4"},
        {:json_web_token,       "~> 0.2"},
        {:timex,                "~> 2.1.4"}]
    end
end
