<script>
/*eslint-disable */
import {btnComponent} from './jsxData'
// const ButtonCounter = {
//   name: 'button-counter',
//   props: ['count'],
//   methods: {
//     onClick() {
//       this.$emit('change', this.count + 1)
//     }
//   },
//   render() {
//     return (
//       <button onClick={this.onClick}>You Clicked Me {this.count} times.</button>
//     )
//   }
// }
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onChange(val) {
      this.count = val
    }
  },
  render() {
    console.log('this---', this)
    const {count, onChange} = this
    const btnProps = {
      props: {
        count
      },
      on: {
        change: onChange
      },
      attrs: {
        type: 'button'
      },
      style: {
        maginTop: '10px'
      }
    }
    return (
      <div>
        <btnComponent
          style={{marginTop: '10px'}}
          type="button"
          count={count}
          onChange={onChange}
        ></btnComponent>
      </div>
    )
  }
}
</script>