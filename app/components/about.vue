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
    -webkit-overflow-scrolling: touch;
    outline: 0;

    .modal-dialog {
      width: 500/16rem;
      position: relative;
      background-color: #fff;
      background-clip: padding-box;
      border: 1/16rem solid rgba(0,0,0,.2);
      border-radius: 3/16rem;
      box-shadow: 0 0 20/16rem rgba(0, 0, 0, .2);
      outline: 0;
    }

    .modal-header {
      padding: 10/16rem 15/16rem;
      border-bottom: 1/16rem solid #e5e5e5;

      .close {
        -webkit-appearance: none;
        margin-top: -2/16rem;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        float: right;
        font-size: 25/16rem;
        line-height: 1;
        color: #000;
        opacity: .2;

        &:focus,
        &:hover {
          color: #000;
          text-decoration: none;
          cursor: pointer;
          opacity: .5;
        }
      }

      .modal-title {
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
      }
    }

    .modal-body {
      position: relative;
      padding: 10/16rem 15/16rem;
      // text-align: center;
      p {
        margin: 5/16rem;
      }
      strong {
        font-weight: 600;
        // font-size: 1.4em;
      }
      ul {
        font-family: Consolas, 'Courier New', monospace;
        line-height: 1.6;
        span {
          display: inline-block;
          min-width: 90/16rem;
        }
      }
    }

    .modal-footer {
      padding: 10/16rem 15/16rem;
      text-align: right;
      border-top: 1/16rem solid #e5e5e5;
    }
  }

  /* 必需 */
  .toggle-transition {
    transition: opacity .15s linear;
    opacity: 1;
    .modal-dialog {
      transition: transform .3s ease-out;
      transform: translate(0, 0);
    }
  }

  /* .toggle-enter 定义进入的开始状态 */
  /* .toggle-leave 定义离开的结束状态 */
  .toggle-enter, .toggle-leave {
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
        <button type="button" class="close" @click="close()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h3 class="modal-title">{{$config.app.name}}</h3>
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
        <button type="button" class="btn btn-primary btn-sm" @click="close()">OK</button>
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
      close () { this.open = false }
    }
  }
</script>
