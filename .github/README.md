# SlimeCraft

Minecraft inside the real Slime Rancher: mine, build, craft and fight on the Far, Far Range with your own Minecraft's blocks, mobs and sounds.

**SlimeCraft is made by [Angais](https://github.com/Angais).** All credit for the mod goes to them.

- Original project: https://github.com/Angais/SlimeCraft
- Report bugs and ask questions there: https://github.com/Angais/SlimeCraft/issues
- Upstream release packaged here: [v1.0.0](https://github.com/Angais/SlimeCraft/releases/tag/v1.0.0) (commit [`2f5c7bb`](https://github.com/Angais/SlimeCraft/tree/2f5c7bbd0fa59e72d0a18a37a11c643ee1d30c48))

> **Beta.** Nobody at SIGF has played this build yet, and the author describes it as early work. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Slime Rancher** ([Steam](https://store.steampowered.com/app/433340/)): 1.4.x (Steam, Windows).
- **Minecraft**: Java Edition 26.1.2 (assets of the player's own install, not launched).
- minecraft-java 26.1.2: Minecraft: Java Edition installed with the official Minecraft Launcher and started once (26.1.2 preferred, any release works): SlimeCraft reads its textures and sounds from %APPDATA%\.minecraft (https://www.minecraft.net/en-us/download).
- Windows and the [SIGF app](https://sigf.ai). The app installs bepinex 5.4.23.5 for you.

## Install

In the SIGF app, open **SlimeCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256, and the files come from the release [`v1.0.0`](../../releases/tag/v1.0.0).

### Good to know

- You need both games: Slime Rancher 1 on Steam (Windows, v1.4.x) and Minecraft: Java Edition.
- Start Minecraft 26.1.2 once from the official Minecraft Launcher before playing: SlimeCraft loads Minecraft's textures, sounds and recipes from %APPDATA%\.minecraft (a Prism or other launcher install is not found; set [Core] MinecraftDir in BepInEx\config\com.angais.slimecraft.cfg to point elsewhere).
- BepInEx 5.4.23.5 is installed into the Slime Rancher folder with the mod; Restore removes both.
- Back up your saves first (%USERPROFILE%\AppData\LocalLow\Monomi Park\Slime Rancher): the author calls it an experimental fan mod; it keeps its own data under BepInEx\config\SlimeCraft and is designed not to change your saves.
- Single-player. Beta: report bugs to the author on the upstream issue tracker.

## What this repository holds

1. The upstream source tree at tag `v1.0.0`, commit [`2f5c7bbd0fa59e72d0a18a37a11c643ee1d30c48`](https://github.com/Angais/SlimeCraft/tree/2f5c7bbd0fa59e72d0a18a37a11c643ee1d30c48), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v1.0.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `BepInEx_win_x64_5.4.23.5.zip` | 639118 B | `82f9878551030f54657792c0740d9d51a09500eeae1fba21106b0c441e6732c4` | BepInEx 5.4.23.5 x64, the official build, unchanged (see THIRD-PARTY.md); unpacked into the Slime Rancher folder. |
| `slimecraft-slimerancher.zip` | 333547 B | `eca83bfe2b148bb57351ba68027c62dbd6c5a82d63a1487ec9199e032c0eea79` | upstream's `SlimeCraft.dll` from release `v1.0.0`, unchanged (sha256 `eb203200...26ed`), with upstream's `LICENSE` and `THIRD_PARTY_NOTICES.md`; unpacked into `BepInEx/plugins/SlimeCraft`. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| SlimeCraft (all of the upstream tree) | MIT, Copyright 2026 Angais | `LICENSE` |
| `SlimeCraft/src/Core/Assets/Inflater.cs` (port of Mark Adler's puff.c) | zlib | `THIRD_PARTY_NOTICES.md` |
| BepInEx 5.4.23.5 and what its zip bundles (release asset) | MIT; UnityDoorstop LGPL-2.1 | `THIRD-PARTY.md` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes SlimeCraft installable in one click, credited to Angais. If you are the author and want anything changed or taken down, open an issue here.
