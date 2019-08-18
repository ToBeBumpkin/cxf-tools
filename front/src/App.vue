<template>
  <div id="app">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">
          <el-link :underline="false">首页</el-link>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/about">
          <el-link :underline="false">about</el-link>
        </router-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">Example</template>
        <el-menu-item index="3-1">
          <router-link to="/execl">
            <el-link :underline="false">execl</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="/pdddate">
            <el-link :underline="false">拼多多数据</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-3">
          <router-link to="/demoaxios">
            <el-link :underline="false">测试请求方式</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-4">
          <router-link to="/mongo">
            <el-link :underline="false">mongo</el-link>
          </router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">统计</template>
        <el-menu-item index="4-1">
          <router-link to="/beef">
            <el-link :underline="false">牛肉统计</el-link>
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<style lang="less">

</style>
