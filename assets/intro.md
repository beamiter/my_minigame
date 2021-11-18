# 小游戏开发者工具

小游戏开发者工具是小游戏框架的一体化开发者工具，帮助开发者开发调试发布小游戏。

核心包括了
**导入游戏资源**：支持通过FBX，[Unity](https://github.com/wechat-miniprogram/minigame-adaptor)，NGUI等生态导入美术资源。

**设计与编辑游戏资源**：设计师可以在工具内编辑游戏资源，游戏场景，并且预览效果。

**开发游戏脚本**：性能优化方案采用类ECS架构，在工具内可以给游戏节点（Entity）挂载脚本组件（Component），实现游戏逻辑的运行以及功能。

**快速运行与调试**：工具可以针对游戏场景进行快速运行预览，不需要等待构建过程。同时工具“可见即所得”地显示游戏数据信息，帮助开发者能更方便地调试游戏。

**多平台构建发布**：工具提供完善的资源构建能力，通过流式加载实现大型项目也能“点开即玩”。支持构建到QQ/H5平台，目前也在内测构建到其他平台中，可以参与到我们活动中提前体验。

**长期版本维护**：小游戏将提供LTS长期版本支持。保证当前稳定版本的持续修复bug，以及新功能的持续更新，同时可以在工具右上角帮助获得技术支持。

可以通过[制作简单游戏的新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_DemoGameTutorial)，来体验在工具中的基础开发流程。

## 关键能力

- 快速上手
  - 资源工作流：[文档](https://developers.weixin.qq.com/minigame/dev/guide/assetworkflow/workflowindex)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_loaderTutorial)
  - 图形渲染：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/render/index)，[材质新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_materialTutorial)
  - 二维系统：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/ui/index)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_2dGameTutorial)
  - 物理系统：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/physics/index)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_physicTutorial)
  - 动画系统：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/animation/index)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_animatorTutorial)
  - 粒子系统：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/particle/index)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_particleTutorial)
  - 关系链：[文档](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/opendata/framework)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_openDataContext)
  - 地形：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/render/terrain/terrain)
  - 音频：[文档](https://developers.weixin.qq.com/minigame/dev/guide/framework/audio/index)，[新手引导](engineide://tutorial/start?plugin_id=engine_tutorial_audioTutorial)
  - 多线程Worker：[文档](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/worker/index)

- 性能demo
  - [动画性能demo](engineide://tutorial/start?plugin_id=engine_demo_animTest)
  - [物理性能demo](engineide://tutorial/start?plugin_id=engine_demo_physxTest)
  - [UI性能demo](engineide://tutorial/start?plugin_id=engine_demo_UIPerfTest)

----





