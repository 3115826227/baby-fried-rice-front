<template>
    <div id="left">
    <el-aside style="min-height:100%;min-width:250px;" width="250px">
        <el-menu :default-active="defaultActive"
                 background-color="#324157"
                 text-color="#bfcbd9"
                 active-text-color="#409EFF"
                 style="position:fixed;top:0;left:0;min-height: 100%;width:250px;z-index:100"
                 router>
            <template v-for="(item,index) in permissionRoutes">
                <el-menu-item :index="item.path" :key="item.path" v-if="item.children.length === 1">
                    <i class="el-icon-menu"></i>
                    <span>{{item.meta.title}}</span>
                </el-menu-item>
                <el-submenu :index="index+''" :key="index" v-else>
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.meta.title}}</span>
                    </template>
                    <template v-for="child in item.children">
                        <el-menu-item :index="item.path+'/'+child.path" :key="item.path+'/'+child.path">{{child.meta.title}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'left',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      'permissionRoutes': state => state.permission.permissionRoutes
    }),
    defaultActive: function () {
      if (this.$route.path.indexOf('/classInfo') >= 0) {
        return 'classList'
      }
      return this.$route.path.replace('/org/', '')
    }
  },
  created () {
    window.setTimeout(() => {
      console.log(this.permissionRoutes)
    }, 1000)
  }
}
</script>
