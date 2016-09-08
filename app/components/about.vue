<style lang="less">
  .modal {
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    .modal-dialog {
      width: 500/16rem;
      background-color: #fff;
      border: 1/16rem solid rgba(0, 0, 0, .2);
      border-radius: 2/16rem;
      box-shadow: 0 0 20/16rem rgba(0, 0, 0, .5);
      outline: 0;
    }
    .modal-header {
      display: flex;
      padding: 10/16rem 15/16rem;
      border-bottom: 1/16rem solid #e5e5e5;
      .modal-title {
        flex: 1;
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
      }
      .close {
        -webkit-appearance: none;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        font-size: 25/16rem;
        line-height: 1;
        color: #000;
        opacity: .2;
        &:focus,
        &:hover {
          opacity: .6;
        }
      }
    }
    .modal-body {
      position: relative;
      padding: 10/16rem 15/16rem;
      p {
        margin: 5/16rem;
      }
      strong {
        font-weight: 600;
      }
      ul {
        line-height: 1.6;
        span {
          display: inline-block;
          min-width: 95/16rem;
        }
        strong {
          font-family: Consolas, 'Courier New', monospace;
        }
      }
    }
    .modal-footer {
      padding: 10/16rem 15/16rem;
      text-align: right;
      border-top: 1/16rem solid #e5e5e5;
    }
  }
  .toggle-transition {
    transition: opacity .15s linear;
    opacity: 1;
    .modal-dialog {
      transition: transform .3s ease-out;
      transform: translate(0, 0);
    }
    & + .window {
      transition: -webkit-filter .3s linear;
      -webkit-filter: blur(2/16rem)
    }
  }
  .toggle-enter,
  .toggle-leave {
    opacity: 0;
    .modal-dialog {
      transform: translate(0, -25%);
    }
  }
</style>

<template>
  <section id="about" class="modal" v-if="open" transition="toggle">
    <section class="modal-dialog" role="document">
      <section class="modal-header drag">
        <h3 class="modal-title">{{$config.app.name}}</h3>
        <button type="button" class="close" @click="close()" aria-label="Close">&times;</button>
      </section>
      <section class="modal-body">
        <p><strong>{{$config.app.description}}</strong></p>
        <ul>
          <li><span>{{$t('about.env')}}:      </span><strong>{{env}}</strong></li>
          <li><span>{{$t('about.core')}}:     </span><strong>v{{versions.app}}</strong></li>
          <li><span>{{$t('about.data')}}:     </span><strong>v{{versions.data}}</strong></li>
          <li><span>{{$t('about.node')}}:     </span><strong>v{{versions.node}}</strong></li>
          <li><span>{{$t('about.electron')}}: </span><strong>v{{versions.electron}}</strong></li>
          <li><span>{{$t('about.chromium')}}: </span><strong>v{{versions.chrome}}</strong></li>
          <li><span>{{$t('about.datetime')}}: </span><strong>{{$config.app.updated}}</strong></li>
        </ul>
      </section>
      <section class="modal-footer">
        <button type="button" class="btn btn-warning btn-sm" @click="reveal()">{{$t('about.btn_reveal')}}</button>
        <button type="button" class="btn btn-primary btn-sm" @click="close()">{{$t('about.btn_ok')}}</button>
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    props: {
      open: { twoWay: true }
    },

    data () {
      process.versions.app = this.$config.app.version
      process.versions.data = this.$db.version
      return { versions: process.versions, env: process.env.NODE_ENV }
    },

    methods: {
      close () { this.open = false },
      reveal () { this.$electron.shell.showItemInFolder(this.$config.log4js.filename) }
    }
  }
</script>
