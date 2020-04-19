<template>
    <div id="square">
      <div id="nav">
        <el-menu default-active="1" @select="handleSelect"
      class="el-menu-vertical-demo">
          <el-menu-item index='101'>
            <span slot="title">官方动态</span>
          </el-menu-item>
          <el-menu-item index='102'>
            <span slot="title">校园兼职</span>
          </el-menu-item>
          <el-menu-item index='103'>
            <span slot="title">表白墙</span>
          </el-menu-item>
          <el-menu-item index='104'>
            <span slot="title">附近租房</span>
          </el-menu-item>
          <el-menu-item index='105'>
            <span slot="title">失物招领</span>
          </el-menu-item>
          <el-menu-item index='106'>
            <span slot="title">社团动态</span>
          </el-menu-item>
          <el-menu-item index='107'>
            <span slot="title">二手市场</span>
          </el-menu-item>
          <el-menu-item index='108'>
            <span slot="title">匿名树洞</span>
          </el-menu-item>
          <el-menu-item index='109'>
            <span slot="title">资源下载</span>
          </el-menu-item>
          <el-menu-item index='110'>
            <span slot="title">好文分享</span>
          </el-menu-item>
          <el-menu-item index='111'>
            <span slot="title">话题讨论</span>
          </el-menu-item>
           <el-menu-item index='112'>
            <span slot="title">帮助咨询</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div id="content">
        <template v-if="current_select == 102">
          <part></part>
        </template>
        <template v-else></template>
      </div>
    </div>
</template>

<script>
import part from '../../components/Main/part.vue'

export default {
  name: 'square',
  components: {
    part
  },
  data () {
    return {
      current_select: 102
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.current_select = key
    }
  }
}
</script>

<style scoped>
#square {
  width: 100%;
  height: 756px;
  margin-left: 20px;
  margin-top: 30px;
  float: left;
}
#nav {
  float: left;
  width: 16%;
}
#content {
  float: left;
  margin-left: 20px;
  border-radius: 5px;
  width: 80%;
  height: 756px;
}
</style>
