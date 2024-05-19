 <template>
  <a-drawer
    :rootClassName="props.class"
    :title="props.drawerTitle"
    :placement="props.placement"
    :closable="props.closeable"
    :visible="props.open"
    @close="onClose"
  >
    <slot></slot>
  </a-drawer>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
    const emits = defineEmits(['closed'])
    
    const props = defineProps({   
      drawerTitle: {
        type: String,
      },
      class: {
        type: String,
        default: ''
      },
      placement:{
        type: String,
        default: "left"
      },
      closeable: {
        type: Boolean,
        default: false,
      },
      open: {
        type: Boolean,
      },
    })

    
const onClose = () => {
  emits('closed');
};
</script>

