/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tui-base-01": "var(--tui-base-01)",
        "tui-base-02": "var(--tui-base-02)",
        "tui-base-03": "var(--tui-base-03)",
        "tui-base-04": "var(--tui-base-04)",
        "tui-base-05": "var(--tui-base-05)",
        "tui-base-06": "var(--tui-base-06)",
        "tui-base-07": "var(--tui-base-07)",
        "tui-base-08": "var(--tui-base-08)",
        "tui-base-09": "var(--tui-base-09)",
        "tui-primary": "var(--tui-primary)",
        "tui-primary-hover": "var(--tui-primary-hover)",
        "tui-primary-active": "var(--tui-primary-active)",
        "tui-primary-text": "var(--tui-primary-text)",
        "tui-secondary": "var(--tui-secondary)",
        "tui-secondary-hover": "var(--tui-secondary-hover)",
        "tui-secondary-active": "var(--tui-secondary-active)",
        "tui-accent": "var(--tui-accent)",
        "tui-accent-hover": "var(--tui-accent-hover)",
        "tui-accent-active": "var(--tui-accent-active)",
        "tui-accent-text": "var(--tui-accent-text)",
        "tui-selection": "var(--tui-selection)",
        "tui-focus": "var(--tui-focus)",
        "tui-clear": "var(--tui-clear)",
        "tui-clear-disabled": "var(--tui-clear-disabled)",
        "tui-clear-hover": "var(--tui-clear-hover)",
        "tui-clear-active": "var(--tui-clear-active)",
        "tui-clear-inverse": "var(--tui-clear-inverse)",
        "tui-clear-inverse-hover": "var(--tui-clear-inverse-hover)",
        "tui-clear-inverse-active": "var(--tui-clear-inverse-active)",
        "tui-elevation-01": "var(--tui-elevation-01)",
        "tui-elevation-02": "var(--tui-elevation-02)",
        "tui-error-fill": "var(--tui-error-fill)",
        "tui-error-bg": "var(--tui-error-bg)",
        "tui-error-bg-hover": "var(--tui-error-bg-hover)",
        "tui-success-fill": "var(--tui-success-fill)",
        "tui-success-bg": "var(--tui-success-bg)",
        "tui-success-bg-hover": "var(--tui-success-bg-hover)",
        "tui-warning-fill": "var(--tui-warning-fill)",
        "tui-warning-bg": "var(--tui-warning-bg)",
        "tui-warning-bg-hover": "var(--tui-warning-bg-hover)",
        "tui-info-fill": "var(--tui-info-fill)",
        "tui-info-bg": "var(--tui-info-bg)",
        "tui-info-bg-hover": "var(--tui-info-bg-hover)",
        "tui-neutral-fill": "var(--tui-neutral-fill)",
        "tui-neutral-bg": "var(--tui-neutral-bg)",
        "tui-neutral-bg-hover": "var(--tui-neutral-bg-hover)",
        "tui-text-01": "var(--tui-text-01)",
        "tui-text-02": "var(--tui-text-02)",
        "tui-text-03": "var(--tui-text-03)",
        "tui-link": "var(--tui-link)",
        "tui-link-hover": "var(--tui-link-hover)",
        "tui-positive": "var(--tui-positive)",
        "tui-positive-hover": "var(--tui-positive-hover)",
        "tui-negative": "var(--tui-negative)",
        "tui-negative-hover": "var(--tui-negative-hover)",
        "tui-error-fill-night": "var(--tui-error-fill-night)",
        "tui-error-bg-night": "var(--tui-error-bg-night)",
        "tui-error-bg-night-hover": "var(--tui-error-bg-night-hover)",
        "tui-success-fill-night": "var(--tui-success-fill-night)",
        "tui-success-bg-night": "var(--tui-success-bg-night)",
        "tui-success-bg-night-hover": "var(--tui-success-bg-night-hover)",
        "tui-warning-fill-night": "var(--tui-warning-fill-night)",
        "tui-warning-bg-night": "var(--tui-warning-bg-night)",
        "tui-warning-bg-night-hover": "var(--tui-warning-bg-night-hover)",
        "tui-info-fill-night": "var(--tui-info-fill-night)",
        "tui-info-bg-night": "var(--tui-info-bg-night)",
        "tui-info-bg-night-hover": "var(--tui-info-bg-night-hover)",
        "tui-neutral-fill-night": "var(--tui-neutral-fill-night)",
        "tui-neutral-bg-night": "var(--tui-neutral-bg-night)",
        "tui-neutral-bg-night-hover": "var(--tui-neutral-bg-night-hover)",
        "tui-autofill-night": "var(--tui-autofill-night)",
        "tui-text-01-night": "var(--tui-text-01-night)",
        "tui-text-02-night": "var(--tui-text-02-night)",
        "tui-text-03-night": "var(--tui-text-03-night)",
        "tui-link-night": "var(--tui-link-night)",
        "tui-link-night-hover": "var(--tui-link-night-hover)",
        "tui-positive-night": "var(--tui-positive-night)",
        "tui-positive-night-hover": "var(--tui-positive-night-hover)",
        "tui-negative-night": "var(--tui-negative-night)",
        "tui-negative-night-hover": "var(--tui-negative-night-hover)",
        "tui-support-01": "var(--tui-support-01)",
        "tui-support-02": "var(--tui-support-02)",
        "tui-support-03": "var(--tui-support-03)",
        "tui-support-04": "var(--tui-support-04)",
        "tui-support-05": "var(--tui-support-05)",
        "tui-support-06": "var(--tui-support-06)",
        "tui-support-07": "var(--tui-support-07)",
        "tui-support-08": "var(--tui-support-08)",
        "tui-support-09": "var(--tui-support-09)",
        "tui-support-10": "var(--tui-support-10)",
        "tui-support-11": "var(--tui-support-11)",
        "tui-support-12": "var(--tui-support-12)",
        "tui-support-13": "var(--tui-support-13)",
        "tui-support-14": "var(--tui-support-14)",
        "tui-support-15": "var(--tui-support-15)",
        "tui-support-16": "var(--tui-support-16)",
        "tui-support-17": "var(--tui-support-17)",
        "tui-support-18": "var(--tui-support-18)",
        "tui-support-19": "var(--tui-support-19)",
        "tui-support-20": "var(--tui-support-20)",
        "tui-support-21": "var(--tui-support-21)",
        "rating-excellent": "var(--tui-support-04)",
        "rating-very-good": "var(--tui-support-20)",
        "rating-good": "var(--tui-support-12)",
        "rating-fair": "var(--tui-support-08)",
        "rating-poor": "var(--tui-support-06)",
      },
      borderRadius: {
        "tui-radius-xs": "var(--tui-radius-xs)",
        "tui-radius-s": "var(--tui-radius-s)",
        "tui-radius-m": "var(--tui-radius-m)",
        "tui-radius-l": "var(--tui-radius-l)",
        "tui-height-xs": "var(--tui-height-xs)",
        inherit: "inherit",
      },
      boxShadow: {
        "tui-box-shadow": "0 0.25rem 1.5rem rgb(0 0 0 / 12%)",
        "tui-box-shadow-hover": "0 0.75rem 2.25rem rgb(0 0 0 / 20%)",
      },
      transitionProperty: {
        "translate-shadow": "transform, box-shadow",
      },
      spacing: {
        98: "26rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
