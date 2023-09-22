<!-- <template>
  <draggable :x="position.x" :y="position.y" :z="zIndex" @dragging="handleDragging" @dragstop="stopDragging">
    <slot name="header"></slot>
  </draggable>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      position: { x: 0, y: 0 },
      zIndex: 0,
    };
  },
  methods: {
    handleDragging(event) {
      this.position.x = event.offset.left;
      this.position.y = event.offset.top;
      this.zIndex += 1;
    },
    stopDragging() {
      console.log('Dragging stopped');
    },
  },
};
</script>

<style scoped>
.draggable {
  position: absolute;
  cursor: move;
}
</style> -->