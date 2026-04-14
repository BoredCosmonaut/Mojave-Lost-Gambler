<script setup>
    import { onMounted,ref,computed } from 'vue';
    import { useAdmin } from '@/composables/useAdmin';

    const {loading,error,fetchApproved,fetchSubmissions,handleApprove,handleDeny,handleDeleteLocation} =useAdmin();
    const items = ref([]);
    const viewMode = ref('preview');
    const selectedItem = ref(null);

    const listItems = computed(() => items.value || []);
    const loadData = async (mode) => {
        viewMode.value = mode;
        selectedItem.value =null;
        items.value = [];

        if(mode == 'pending') {
            const res = await fetchSubmissions();
            items.value = res?.pending || [];
        } else {
            const res= await fetchApproved();
            items.value = res?.locations || res?.approved || res || [];
        }
    };

  const processAction = async (action, id) => {
      let success = false;

      if (action === 'approve') {
          success = await handleApprove(id);
      } else if (action === 'deny') {
          success = await handleDeny(id);
      } else if (action === 'delete') {
          success = await handleDeleteLocation(id);
      }

      if (success) {
          items.value = items.value.filter(i => i.id !== id);
          selectedItem.value = null;
      }
  };



    onMounted(() => {
        loadData('pending')
    })

</script>

<template>
    <div class="terminal-dashboard">
        <div class="scanlines"></div>
        <header class="status-header">
            <div class="sys-info">ROBCO_OS v1.0.4 // ADMIN_PORTAL</div>
            <nav class="mode-switch">
                <button
                    @click="loadData('pending')"
                    :class="{active: viewMode == 'pending'}"
                >
                [ PENDING_RECON ]
                </button>
                <button
                    @click="loadData('approved')"
                    :class="{active: viewMode == 'approved'}"
                >
                [ DATABASE_LOCS ]
                </button>
            </nav>
        </header>
        <div class="main-interface">
            <aside class="list-pane">
                <div v-if="loading && !listItems.length" class="status-msg">SCANNING_FREQUENCIES...</div>
                <div v-else-if="!loading && listItems.length == 0" class="status-msg">NO_RECORDS_FOUND</div>
                <div
                    v-for="item in listItems"
                    :key="item.id"
                    class="list-entry"
                    :class="{selected : selectedItem?.id == item.id}"
                    @click="selectedItem = item"
                >
                    <span class="pointer">></span> {{ item.location_name || 'ID_' + item.id }}
                </div>
            </aside>

            <section class="data-pane">
                <div v-if="selectedItem" class="data-wrapper">
                    <h2 class="data-title">LOCATION_RECON_DATA</h2>
                    <div class="image-frame">
                        <img 
                            v-if="selectedItem.image_url"
                            :src="selectedItem.image_url"
                            class="raw-capture"
                            alt="Preview Image"
                        />
                        <div v-else class="no-data-msg">IMAGE_DATA_CORRUPT_OR_MISSING</div>
                    </div>
                    <div class="metadata">
                        <p> <span class="label">COORD_LAT:</span>{{ selectedItem.y }}</p>
                        <p> <span class="label">COORD_LAT:</span>{{ selectedItem.x }}</p>
                        <p> <span class="label">Region:</span>{{ selectedItem.region }}</p>
                    </div>
                    <div class="command-line">
                        <template v-if="viewMode == 'pending'">
                            <button @click="processAction('approve', selectedItem.id)" class="cmd-btn btn-green">
                                [APPROVE]
                            </button>
                            <button @click="processAction('deny', selectedItem.id)" class="cmd-btn btn-red">
                                [ DELETE_DATA ]
                            </button>
                        </template>
                        <template v-else>
                            <button @click="processAction('delete',selectedItem.id)" class="cmd-btn btn-red">
                                [ PURGE_FROM_ARCHIVE ]
                            </button>
                        </template>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p>AWAITING_INPUT<span class="blink">█</span></p>
                </div>
            </section>
        </div>
        <div v-if="error" class="error-footer">
            !! SYSTEM_FAILURE: {{ error }} !!
        </div>
    </div>
</template>

<style scoped>
.terminal-dashboard {
  background-color: #050505;
  color: #ffb642; 
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}


.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid #ffb642;
}

.mode-switch {
  display: flex;
  gap: 20px;
}

.mode-switch button {
  background: transparent;
  border: none;
  color: #ffb642;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 10px;
}

.mode-switch button.active {
  background: #ffb642;
  color: #050505;
}


.main-interface {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.list-pane {
  width: 300px;
  border-right: 1px solid rgba(255, 182, 66, 0.3);
  overflow-y: auto;
  padding: 10px 0;
}

.data-pane {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}


.list-entry {
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255, 182, 66, 0.05);
}

.list-entry:hover {
  background: rgba(255, 182, 66, 0.1);
}

.list-entry.selected {
  background: rgba(255, 182, 66, 0.2);
  font-weight: bold;
}

.pointer {
  opacity: 0;
  margin-right: 5px;
}

.selected .pointer {
  opacity: 1;
}

.data-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.image-frame {
  width: 100%;
  max-width: 600px;
  background: #000;
  border: 1px solid rgba(255, 182, 66, 0.2);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.raw-capture {
  max-width: 100%;
  max-height: 500px;
  display: block;
  object-fit: contain;
}

.label {
  opacity: 0.6;
}

.command-line {
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.cmd-btn {
  background: transparent;
  border: 1px solid #ffb642;
  color: #ffb642;
  padding: 12px 24px;
  font-family: inherit;
  cursor: pointer;
}

.cmd-btn:hover {
  background: #ffb642;
  color: #050505;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}

.blink {
  animation: blink-anim 1s steps(2) infinite;
}

@keyframes blink-anim {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.error-footer {
  background: #aa0000;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}
</style>