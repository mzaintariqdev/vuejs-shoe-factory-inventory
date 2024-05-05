 <template>
  <a-drawer
    :title="props.drawerTitle"
    :placement="props.placement"
    :closable="true"
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
      placement:{
        type: String,
        default: "left"
      },
      open: {
        type: Boolean,
      },
    })

    
const onClose = () => {
  emits('closed');
};
</script>