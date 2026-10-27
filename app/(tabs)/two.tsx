import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { UserBadge } from '@/components/UserBadge';

const steps = [
  { title: 'Discover', kind: 'SCREEN', copy: 'Browse nearby walks. Filter by effort, time, or saved routes.', icon: 'safari.fill' as const },
  { title: 'Trail details', kind: 'SCREEN', copy: 'Check distance, estimated time, difficulty, and what to expect.', icon: 'map.fill' as const },
  { title: 'Choose your next move', kind: 'DECISION', copy: 'Save the route for later, or start walking now.', icon: 'arrow.triangle.branch' as const },
  { title: 'Active walk', kind: 'SCREEN', copy: 'Follow the route and keep the walk details close at hand.', icon: 'figure.walk' as const },
  { title: 'Walk complete', kind: 'OUTCOME', copy: 'Finish the walk and add it to your personal walk log.', icon: 'checkmark.seal.fill' as const },
];

export default function AppFlowScreen() {
  const [selectedStep, setSelectedStep] = useState(0);
  const selected = steps[selectedStep];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.topline}>
        <View style={styles.brandMark}><SymbolView name="point.topleft.down.to.point.bottomright.curvepath" tintColor="#F9F7F1" size={17} /></View>
        <Text style={styles.brand}>SIDEQUEST / PRODUCT MAP</Text>
        <View style={styles.userBadge}><UserBadge /></View>
      </View>
      <Text style={styles.kicker}>PART 01  ·  APP FLOW</Text>
      <Text style={styles.title}>From “where to?”{ '\n' }to “that was good.”</Text>
      <Text style={styles.subtitle}>A neighborhood walk finder that turns a free hour into a small adventure.</Text>

      <View style={styles.mapHeader}>
        <Text style={styles.mapLabel}>PRIMARY WALK JOURNEY</Text>
        <Text style={styles.mapCount}>05 STEPS</Text>
      </View>

      <View style={styles.flow}>
        {steps.map((step, index) => {
          const isSelected = selectedStep === index;
          const isDecision = step.kind === 'DECISION';
          return (
            <View key={step.title} style={styles.flowItem}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedStep(index)}
                style={[styles.node, isSelected && styles.nodeSelected, isDecision && styles.decisionNode]}>
                <View style={[styles.nodeIcon, isSelected && styles.nodeIconSelected]}>
                  <SymbolView name={step.icon} tintColor={isSelected ? '#F9F7F1' : '#425347'} size={18} />
                </View>
                <View style={styles.nodeText}>
                  <Text style={[styles.nodeType, isSelected && styles.nodeTypeSelected]}>{step.kind}</Text>
                  <Text style={[styles.nodeTitle, isSelected && styles.nodeTitleSelected]}>{step.title}</Text>
                </View>
                <SymbolView name="chevron.right" tintColor={isSelected ? '#E6D7B5' : '#9AA095'} size={14} />
              </Pressable>
              {index < steps.length - 1 && (
                <View style={styles.connector}>
                  <View style={styles.connectorLine} />
                  {isDecision ? (
                    <View style={styles.branchLabels}>
                      <Text style={styles.branchLabel}>START WALK</Text>
                      <Text style={styles.branchLabel}>SAVE FOR LATER</Text>
                    </View>
                  ) : null}
                  <SymbolView name="arrow.down" tintColor="#B6BAAF" size={12} />
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.detail}>
        <View style={styles.detailTop}>
          <Text style={styles.detailEyebrow}>SELECTED {selected.kind}</Text>
          <Text style={styles.stepNumber}>0{selectedStep + 1} / 05</Text>
        </View>
        <Text style={styles.detailTitle}>{selected.title}</Text>
        <Text style={styles.detailCopy}>{selected.copy}</Text>
        {selectedStep === 2 ? (
          <View style={styles.choiceRow}>
            <View style={styles.choice}><SymbolView name="figure.walk" tintColor="#F9F7F1" size={15} /><Text style={styles.choiceText}>Start walk</Text></View>
            <View style={[styles.choice, styles.choiceLight]}><SymbolView name="bookmark" tintColor="#354A3D" size={14} /><Text style={styles.choiceTextDark}>Save route</Text></View>
          </View>
        ) : null}
        <View style={styles.detailControls}>
          <Pressable accessibilityRole="button" accessibilityLabel="Previous flow step" disabled={selectedStep === 0} onPress={() => setSelectedStep((step) => Math.max(0, step - 1))} style={[styles.control, selectedStep === 0 && styles.controlDisabled]}>
            <SymbolView name="arrow.left" tintColor={selectedStep === 0 ? '#B7BCB3' : '#354A3D'} size={16} />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Next flow step" onPress={() => setSelectedStep((step) => (step + 1) % steps.length)} style={[styles.control, styles.nextControl]}>
            <Text style={styles.nextText}>{selectedStep === steps.length - 1 ? 'REPLAY FLOW' : 'NEXT STEP'}</Text>
            <SymbolView name={selectedStep === steps.length - 1 ? 'arrow.counterclockwise' : 'arrow.right'} tintColor="#F9F7F1" size={14} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.footer}>SIDEQUEST  ·  PRODUCT FLOW  ·  V1</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F6F0' },
  content: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 34 },
  topline: { flexDirection: 'row', alignItems: 'center', marginBottom: 34 },
  brandMark: { width: 31, height: 31, borderRadius: 16, backgroundColor: '#354A3D', alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  brand: { color: '#52614A', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  userBadge: { marginLeft: 'auto' },
  kicker: { color: '#C26448', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#26372E', fontSize: 34, lineHeight: 37, fontWeight: '700', marginTop: 10, letterSpacing: -0.5 },
  subtitle: { color: '#687267', fontSize: 13, lineHeight: 19, marginTop: 10, maxWidth: 330 },
  mapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#DFE2DA' },
  mapLabel: { color: '#52614A', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  mapCount: { color: '#92988E', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  flow: { paddingTop: 14 },
  flowItem: { alignItems: 'stretch' },
  node: { minHeight: 64, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFEEE7', borderWidth: 1, borderColor: '#E1E2D9', borderRadius: 4, paddingHorizontal: 12, gap: 11 },
  nodeSelected: { backgroundColor: '#354A3D', borderColor: '#354A3D' },
  decisionNode: { borderStyle: 'dashed', borderColor: '#C26448' },
  nodeIcon: { width: 36, height: 36, borderRadius: 19, backgroundColor: '#E0E5DA', alignItems: 'center', justifyContent: 'center' },
  nodeIconSelected: { backgroundColor: '#526B57' },
  nodeText: { flex: 1 },
  nodeType: { color: '#879084', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  nodeTypeSelected: { color: '#D5C9A9' },
  nodeTitle: { color: '#29382E', fontSize: 14, fontWeight: '700', marginTop: 3 },
  nodeTitleSelected: { color: '#F9F7F1' },
  connector: { minHeight: 34, alignItems: 'center', justifyContent: 'center' },
  connectorLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#C7CCC1' },
  branchLabels: { position: 'absolute', right: 3, left: 3, top: 7, flexDirection: 'row', justifyContent: 'space-between' },
  branchLabel: { color: '#B25B41', backgroundColor: '#F7F6F0', paddingHorizontal: 5, fontSize: 7, fontWeight: '800', letterSpacing: 0.6 },
  detail: { marginTop: 18, padding: 16, borderTopWidth: 2, borderTopColor: '#C26448', backgroundColor: '#ECECE4' },
  detailTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailEyebrow: { color: '#C26448', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  stepNumber: { color: '#90978B', fontSize: 9, fontWeight: '700' },
  detailTitle: { color: '#29382E', fontSize: 19, fontWeight: '700', marginTop: 10 },
  detailCopy: { color: '#687267', fontSize: 12, lineHeight: 18, marginTop: 5 },
  choiceRow: { flexDirection: 'row', gap: 8, marginTop: 13 },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#354A3D', paddingVertical: 8, paddingHorizontal: 10 },
  choiceLight: { backgroundColor: '#E0E5DA' },
  choiceText: { color: '#F9F7F1', fontSize: 10, fontWeight: '700' },
  choiceTextDark: { color: '#354A3D', fontSize: 10, fontWeight: '700' },
  detailControls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  control: { minWidth: 40, height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, paddingHorizontal: 12, borderWidth: 1, borderColor: '#C7CCC1' },
  controlDisabled: { borderColor: '#E0E2DA' },
  nextControl: { backgroundColor: '#354A3D', borderColor: '#354A3D' },
  nextText: { color: '#F9F7F1', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  footer: { color: '#A0A59D', fontSize: 8, fontWeight: '800', letterSpacing: 1.4, textAlign: 'center', marginTop: 25 },
});
