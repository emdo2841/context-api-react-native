import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { UserBadge } from '@/components/UserBadge';

const routes = [
  {
    id: 'lake',
    name: 'Lake loop',
    place: 'Green Lake Park',
    distance: '2.8 mi',
    duration: '52 min',
    difficulty: 'Easy',
    color: '#DDE8D6',
    icon: 'water.waves' as const,
  },
  {
    id: 'ridge',
    name: 'Ridge lookout',
    place: 'Discovery Park',
    distance: '4.1 mi',
    duration: '1 hr 25',
    difficulty: 'Moderate',
    color: '#F3D9C9',
    icon: 'mountain.2.fill' as const,
  },
  {
    id: 'garden',
    name: 'Garden paths',
    place: 'Washington Park Arboretum',
    distance: '1.6 mi',
    duration: '38 min',
    difficulty: 'Easy',
    color: '#E8E2C7',
    icon: 'leaf.fill' as const,
  },
];

const filters = ['All', 'Easy', 'Under 1h', 'Saved'];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedRoutes, setSavedRoutes] = useState<string[]>(['garden']);

  const visibleRoutes = useMemo(() => routes.filter((route) => {
    if (activeFilter === 'Easy') return route.difficulty === 'Easy';
    if (activeFilter === 'Under 1h') return !route.duration.includes('hr');
    if (activeFilter === 'Saved') return savedRoutes.includes(route.id);
    return true;
  }), [activeFilter, savedRoutes]);

  function toggleSaved(id: string) {
    setSavedRoutes((current) => current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id]);
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.topline}>
        <View style={styles.brandMark}><SymbolView name="figure.walk" tintColor="#F9F7F1" size={19} /></View>
        <Text style={styles.brand}>SIDEQUEST</Text>
        <UserBadge />
      </View>

      <Text style={styles.kicker}>A LITTLE OUTSIDE, A LOT CLOSER</Text>
      <Text style={styles.headline}>Find your{ '\n' }outside.</Text>
      <Text style={styles.intro}>Good walks, just around the corner.</Text>

      <Pressable style={styles.feature} onPress={() => router.navigate('/(tabs)/two')}>
        <View style={styles.featureTop}>
          <View style={styles.featureLabel}><Text style={styles.featureLabelText}>THE WEEKEND EDIT</Text></View>
          <SymbolView name="arrow.up.right" tintColor="#F9F7F1" size={19} />
        </View>
        <View style={styles.featureArt}>
          <View style={styles.sun} />
          <View style={styles.hillBack} />
          <View style={styles.hillFront} />
          <View style={styles.trailLine} />
        </View>
        <View style={styles.featureBottom}>
          <View>
            <Text style={styles.featureTitle}>Take the scenic route</Text>
            <Text style={styles.featureSubtitle}>A 3-step guide from browse to bliss</Text>
          </View>
          <View style={styles.roundArrow}><SymbolView name="arrow.right" tintColor="#26372E" size={16} /></View>
        </View>
      </Pressable>

      <View style={styles.sectionHeading}>
        <View><Text style={styles.sectionEyebrow}>MADE FOR RIGHT NOW</Text><Text style={styles.sectionTitle}>Nearby walks</Text></View>
        <Text style={styles.count}>{visibleRoutes.length} ROUTES</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter) => {
          const selected = activeFilter === filter;
          return (
            <Pressable key={filter} onPress={() => setActiveFilter(filter)} style={[styles.filter, selected && styles.filterSelected]}>
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{filter}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleRoutes.length === 0 ? (
        <View style={styles.emptyState}><Text style={styles.emptyTitle}>No saved walks yet</Text><Text style={styles.emptyCopy}>Tap the bookmark on a route to keep it here.</Text></View>
      ) : visibleRoutes.map((route) => {
        const saved = savedRoutes.includes(route.id);
        return (
          <View key={route.id} style={styles.routeRow}>
            <View style={[styles.routeArt, { backgroundColor: route.color }]}>
              <SymbolView name={route.icon} tintColor="#344338" size={25} />
              <View style={styles.artDot} />
            </View>
            <View style={styles.routeInfo}>
              <Text style={styles.routeName}>{route.name}</Text>
              <Text style={styles.routePlace}>{route.place}</Text>
              <Text style={styles.routeMeta}>{route.distance}  ·  {route.duration}  ·  {route.difficulty}</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={saved ? `Remove ${route.name} from saved walks` : `Save ${route.name}`} onPress={() => toggleSaved(route.id)} style={styles.saveButton}>
              <SymbolView name={saved ? 'bookmark.fill' : 'bookmark'} tintColor={saved ? '#C65E43' : '#687267'} size={19} />
            </Pressable>
          </View>
        );
      })}
      <Text style={styles.footer}>SMALL WALKS. GOOD STORIES.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F6F0' },
  content: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 36 },
  topline: { flexDirection: 'row', alignItems: 'center', marginBottom: 34 },
  brandMark: { width: 31, height: 31, borderRadius: 16, backgroundColor: '#354A3D', alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  brand: { color: '#29382E', fontSize: 12, fontWeight: '800', letterSpacing: 1.6 },
  location: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: '#E9ECE4', borderRadius: 20 },
  locationText: { color: '#52614A', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  kicker: { color: '#C26448', fontSize: 10, fontWeight: '800', letterSpacing: 1.6 },
  headline: { color: '#26372E', fontSize: 48, lineHeight: 49, fontWeight: '700', marginTop: 8, letterSpacing: -1 },
  intro: { color: '#687267', fontSize: 14, marginTop: 10, marginBottom: 22 },
  feature: { backgroundColor: '#354A3D', borderRadius: 5, padding: 17, overflow: 'hidden', minHeight: 228 },
  featureTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 },
  featureLabel: { borderWidth: 1, borderColor: 'rgba(249,247,241,0.42)', paddingHorizontal: 8, paddingVertical: 5 },
  featureLabelText: { color: '#F9F7F1', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  featureArt: { position: 'absolute', top: 0, right: 0, bottom: 60, left: 0 },
  sun: { position: 'absolute', width: 64, height: 64, borderRadius: 32, backgroundColor: '#E5B16E', right: 35, top: 40 },
  hillBack: { position: 'absolute', height: 116, width: 240, borderRadius: 120, backgroundColor: '#78876A', bottom: -60, right: -40, transform: [{ rotate: '-13deg' }] },
  hillFront: { position: 'absolute', height: 100, width: 265, borderRadius: 140, backgroundColor: '#536B55', bottom: -72, left: -35, transform: [{ rotate: '10deg' }] },
  trailLine: { position: 'absolute', width: 50, height: 93, borderTopLeftRadius: 45, borderTopRightRadius: 40, borderLeftWidth: 13, borderTopWidth: 12, borderColor: '#E6D7B5', bottom: -49, right: 90, transform: [{ rotate: '30deg' }] },
  featureBottom: { marginTop: 130, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 2 },
  featureTitle: { color: '#F9F7F1', fontSize: 19, fontWeight: '700' },
  featureSubtitle: { color: '#D3D7CC', fontSize: 11, marginTop: 5 },
  roundArrow: { width: 34, height: 34, borderRadius: 18, backgroundColor: '#E9E5D8', alignItems: 'center', justifyContent: 'center' },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 29, marginBottom: 14 },
  sectionEyebrow: { fontSize: 9, fontWeight: '800', letterSpacing: 1.3, color: '#C26448' },
  sectionTitle: { fontSize: 23, fontWeight: '700', color: '#26372E', marginTop: 4 },
  count: { fontSize: 9, fontWeight: '800', letterSpacing: 1, color: '#899087', paddingBottom: 4 },
  filters: { gap: 8, paddingBottom: 15 },
  filter: { borderWidth: 1, borderColor: '#D8DDD4', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 14 },
  filterSelected: { backgroundColor: '#354A3D', borderColor: '#354A3D' },
  filterText: { color: '#626D62', fontSize: 11, fontWeight: '600' },
  filterTextSelected: { color: '#F9F7F1' },
  routeRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#E2E4DD', paddingVertical: 13, gap: 12 },
  routeArt: { width: 58, height: 58, borderRadius: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  artDot: { position: 'absolute', width: 23, height: 23, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.28)', top: -5, right: -3 },
  routeInfo: { flex: 1 },
  routeName: { color: '#29382E', fontSize: 14, fontWeight: '700' },
  routePlace: { color: '#7D857A', fontSize: 10, marginTop: 3 },
  routeMeta: { color: '#52614A', fontSize: 9, fontWeight: '600', marginTop: 7 },
  saveButton: { width: 34, height: 38, alignItems: 'center', justifyContent: 'center' },
  emptyState: { paddingVertical: 25, borderTopWidth: 1, borderColor: '#E2E4DD' },
  emptyTitle: { color: '#29382E', fontSize: 14, fontWeight: '700' },
  emptyCopy: { color: '#7D857A', fontSize: 11, marginTop: 5 },
  footer: { color: '#A0A59D', fontSize: 8, fontWeight: '800', letterSpacing: 1.5, textAlign: 'center', marginTop: 27 },
});
