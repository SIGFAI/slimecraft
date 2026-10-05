// SlimeCraft (Angais, MIT AND Zlib): Minecraft inside Slime Rancher 1, a BepInEx 5 plugin. Rehosted on SIGFAI/slimecraft
// (standard upstream fusion, source.hosted) with the official BepInEx 5 x64 build, so the player installs nothing by hand.
//   node library/slimecraft/build.mjs [--fixture]       (outputs: library/lib.mjs)
import { BEPINEX, asset, card, dl, emit, pinned, rawAt, zipAsset } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Angais/SlimeCraft', tag: 'v1.0.0', commit: '2f5c7bbd0fa59e72d0a18a37a11c643ee1d30c48',
  license: 'MIT AND Zlib', authors: ['Angais'],
  dll: { file: 'SlimeCraft.dll', sha256: 'eb2032002ee630ffdd106a2a1267e435b1b22f1c804319ffdaf1ea295d9a26ed' }, // = GitHub digest
};
const ID = 'slimecraft', VERSION = '1.0.0';

const dll = await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.dll.file}`, UP.dll.sha256);
const bepinex = asset(BEPINEX.file, await pinned(BEPINEX.url, BEPINEX.sha256), { zipped: true });
// The plugin unchanged, with its license and notices, into {game}/BepInEx/plugins/SlimeCraft (upstream's layout).
const plugin = zipAsset(`${ID}-slimerancher.zip`, [
  { name: 'SlimeCraft.dll', data: dll },
  { name: 'LICENSE.txt', data: await rawAt(UP.repo, UP.commit, 'LICENSE') },
  { name: 'THIRD_PARTY_NOTICES.md', data: await rawAt(UP.repo, UP.commit, 'THIRD_PARTY_NOTICES.md') },
]);
const assets = [bepinex, plugin];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: 'SlimeCraft',
  tagline: 'Minecraft inside the real Slime Rancher: mine, build, craft and fight on the Far, Far Range with your own Minecraft\'s blocks, mobs and sounds.',
  kind: 'mashup', // Minecraft does not run: its assets are read from the player's install
  games: [
    { game: 'slimerancher', role: 'host', label: 'Slime Rancher', engine: 'Slime Rancher 1 (Unity, Mono, x64) + BepInEx 5 plugin (C#)', apps: { steam: '433340' }, runtime: '1.4.x (Steam, Windows)' },
    { game: 'minecraft', role: 'guest', label: 'Minecraft', mc: '26.1.2', uses: 'assets of the player\'s own install, not launched' },
  ],
  requires: [
    // Shipped: the same release asset as the first install file (the app fetches it once, the card shows it handled).
    { id: BEPINEX.id, version: BEPINEX.version, license: `${BEPINEX.license}, shipped unchanged`, page: `${BEPINEX.repo}/releases/tag/v${BEPINEX.version}`,
      note: 'installed into the Slime Rancher folder by the app', source: { url: urls[bepinex.name], sha256: bepinex.sha256 } },
    { id: 'minecraft-java', version: '26.1.2', page: 'https://www.minecraft.net/en-us/download',
      note: 'Minecraft: Java Edition installed with the official Minecraft Launcher and started once (26.1.2 preferred, any release works): SlimeCraft reads its textures and sounds from %APPDATA%\\.minecraft' },
  ],
  install: [
    { game: 'slimerancher', strategy: 'game-dir-snapshot', loader: 'bepinex', files: [
      { src: bepinex.name, dst: '{game}', unpack: true, contents: bepinex.contents, ...dl(bepinex, urls) },
      { src: plugin.name, dst: '{game}/BepInEx/plugins/SlimeCraft', unpack: true, contents: plugin.contents, ...dl(plugin, urls) },
    ] },
  ],
  launch: [{ game: 'slimerancher', args: [] }],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: 'MIT AND Zlib AND LGPL-2.1', upstream_license: UP.license, tag: UP.tag, commit: UP.commit,
    hosted: `https://github.com/SIGFAI/${ID}`,
    bundled: [{ name: 'BepInEx', version: BEPINEX.version, repo: BEPINEX.repo, commit: BEPINEX.commit, license: BEPINEX.license }],
  },
  media: { cover: `https://raw.githubusercontent.com/Angais/SlimeCraft/${UP.commit}/docs/images/tnt-launches-slimes.jpg` },
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    'You need both games: Slime Rancher 1 on Steam (Windows, v1.4.x) and Minecraft: Java Edition.',
    'Start Minecraft 26.1.2 once from the official Minecraft Launcher before playing: SlimeCraft loads Minecraft\'s textures, sounds and recipes from %APPDATA%\\.minecraft (a Prism or other launcher install is not found; set [Core] MinecraftDir in BepInEx\\config\\com.angais.slimecraft.cfg to point elsewhere).',
    'BepInEx 5.4.23.5 is installed into the Slime Rancher folder with the mod; Restore removes both.',
    'Back up your saves first (%USERPROFILE%\\AppData\\LocalLow\\Monomi Park\\Slime Rancher): the author calls it an experimental fan mod; it keeps its own data under BepInEx\\config\\SlimeCraft and is designed not to change your saves.',
    'Single-player. Beta: report bugs to the author on the upstream issue tracker.',
  ],
});

emit({ slug: ID, version: VERSION, assets, fixtureAssets: assets, make });
