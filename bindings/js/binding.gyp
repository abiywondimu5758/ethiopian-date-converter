{
  "targets": [
    {
      "target_name": "ethiopic_calendar",
      "sources": [
        "src/binding.cpp",
        "src/core/ethiopic_calendar.c"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "src/core"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "conditions": [
        ["OS=='win'", {
          "defines": [
            "_HAS_EXCEPTIONS=1"
          ]
        }]
      ]
    }
  ]
}
