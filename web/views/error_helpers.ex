defmodule ScheduleApp.ErrorHelpers do
    use Phoenix.HTML

    def error_tag(form, field) do
        if error = form.errors[field] do
            content_tag :span, translate_error(error), class: "help-block"
        end
    end

    def translate_error({msg, opts}) do
        Gettext.dngettext(ScheduleApp.Gettext, "errors", msg, msg, opts[:count], opts)
    end

    def translate_error(msg) do
        Gettext.dgettext(ScheduleApp.Gettext, "errors", msg)
    end
end
